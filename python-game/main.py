import sys
import pygame
import random
import time

# Check Python version
if sys.version_info < (3, 12):
    print("This script requires Python 3.12 or newer!")
    sys.exit(1)

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
CELL_SIZE = 10
GRID_WIDTH = WIDTH // CELL_SIZE
GRID_HEIGHT = (HEIGHT - 100) // CELL_SIZE  # Reserve bottom 100px for controls
BUTTON_HEIGHT = 40
BUTTON_MARGIN = 10
SLIDER_HEIGHT = 20

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (128, 128, 128)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
BACKGROUND = (30, 30, 30)
GRID_COLOR = (50, 50, 50)
BUTTON_COLOR = (70, 70, 70)
BUTTON_HOVER_COLOR = (90, 90, 90)
BUTTON_TEXT_COLOR = (220, 220, 220)
SLIDER_COLOR = (60, 60, 60)
SLIDER_HANDLE_COLOR = (120, 120, 120)
SLIDER_ACTIVE_COLOR = (100, 180, 255)

# Create the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Conway's Game of Life")
clock = pygame.time.Clock()

# Font
font = pygame.font.SysFont('Arial', 20)

# Game state
grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
running = False
generation = 0
generation_speed = 10  # Generations per second
last_update_time = time.time()

# Button class
class Button:
    def __init__(self, x, y, width, height, text, action):
        self.rect = pygame.Rect(x, y, width, height)
        self.text = text
        self.action = action
        self.hovered = False
        
    def draw(self):
        color = BUTTON_HOVER_COLOR if self.hovered else BUTTON_COLOR
        pygame.draw.rect(screen, color, self.rect, border_radius=5)
        pygame.draw.rect(screen, WHITE, self.rect, 2, border_radius=5)
        
        text_surf = font.render(self.text, True, BUTTON_TEXT_COLOR)
        text_rect = text_surf.get_rect(center=self.rect.center)
        screen.blit(text_surf, text_rect)
        
    def update(self, mouse_pos):
        self.hovered = self.rect.collidepoint(mouse_pos)
        
    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 and self.hovered:
            self.action()
            return True
        return False

# Slider class
class Slider:
    def __init__(self, x, y, width, height, min_val, max_val, initial_val, label):
        self.rect = pygame.Rect(x, y, width, height)
        self.handle_radius = height // 2 + 5
        self.min_val = min_val
        self.max_val = max_val
        self.value = initial_val
        self.dragging = False
        self.label = label
        self.update_handle_position()
        
    def update_handle_position(self):
        value_range = self.max_val - self.min_val
        position_ratio = (self.value - self.min_val) / value_range
        self.handle_x = self.rect.x + int(position_ratio * self.rect.width)
        
    def draw(self):
        # Draw slider track
        pygame.draw.rect(screen, SLIDER_COLOR, self.rect, border_radius=self.rect.height // 2)
        
        # Draw active part of track
        active_width = self.handle_x - self.rect.x
        active_rect = pygame.Rect(self.rect.x, self.rect.y, active_width, self.rect.height)
        pygame.draw.rect(screen, SLIDER_ACTIVE_COLOR, active_rect, border_radius=self.rect.height // 2)
        
        # Draw handle
        pygame.draw.circle(screen, SLIDER_HANDLE_COLOR, (self.handle_x, self.rect.centery), self.handle_radius)
        pygame.draw.circle(screen, WHITE, (self.handle_x, self.rect.centery), self.handle_radius, 2)
        
        # Draw label and value
        label_text = f"{self.label}: {self.value:.1f}"
        text_surf = font.render(label_text, True, WHITE)
        text_rect = text_surf.get_rect(midtop=(self.rect.centerx, self.rect.y - 25))
        screen.blit(text_surf, text_rect)
        
    def update(self, mouse_pos):
        handle_rect = pygame.Rect(
            self.handle_x - self.handle_radius, 
            self.rect.y - 5, 
            self.handle_radius * 2, 
            self.rect.height + 10
        )
        self.hovered = handle_rect.collidepoint(mouse_pos)
        
    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            handle_rect = pygame.Rect(
                self.handle_x - self.handle_radius, 
                self.rect.y - 5, 
                self.handle_radius * 2, 
                self.rect.height + 10
            )
            if handle_rect.collidepoint(event.pos):
                self.dragging = True
                return True
                
        elif event.type == pygame.MOUSEBUTTONUP and event.button == 1:
            self.dragging = False
            
        elif event.type == pygame.MOUSEMOTION and self.dragging:
            rel_x = max(self.rect.x, min(event.pos[0], self.rect.right))
            position_ratio = (rel_x - self.rect.x) / self.rect.width
            self.value = self.min_val + position_ratio * (self.max_val - self.min_val)
            self.handle_x = rel_x
            return True
            
        return False

# Function to randomize grid
def randomize_grid():
    global grid, generation
    grid = [[random.choice([0, 1]) for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
    generation = 0

# Function to clear grid
def clear_grid():
    global grid, generation
    grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
    generation = 0

# Function to toggle game running state
def toggle_game():
    global running
    running = not running

# Function to step one generation
def step_generation():
    global grid, generation
    # Run a single update of the game logic
    update_grid()
    generation += 1

# Function to count neighbors
def count_neighbors(grid, x, y):
    count = 0
    for i in range(-1, 2):
        for j in range(-1, 2):
            if i == 0 and j == 0:
                continue
            nx, ny = (x + i) % GRID_WIDTH, (y + j) % GRID_HEIGHT
            count += grid[ny][nx]
    return count

# Function to update grid based on rules
def update_grid():
    global grid
    new_grid = [[0 for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]
    
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            neighbors = count_neighbors(grid, x, y)
            # Apply Conway's Game of Life rules
            if grid[y][x] == 1 and (neighbors == 2 or neighbors == 3):
                new_grid[y][x] = 1
            elif grid[y][x] == 0 and neighbors == 3:
                new_grid[y][x] = 1
    
    grid = new_grid

# Create UI elements
button_width = 120
button_x = (WIDTH - (button_width * 4 + BUTTON_MARGIN * 3)) // 2
button_y = HEIGHT - BUTTON_HEIGHT - BUTTON_MARGIN

buttons = [
    Button(button_x, button_y, button_width, BUTTON_HEIGHT, "Start/Stop", toggle_game),
    Button(button_x + button_width + BUTTON_MARGIN, button_y, button_width, BUTTON_HEIGHT, "Step", step_generation),
    Button(button_x + (button_width + BUTTON_MARGIN) * 2, button_y, button_width, BUTTON_HEIGHT, "Random", randomize_grid),
    Button(button_x + (button_width + BUTTON_MARGIN) * 3, button_y, button_width, BUTTON_HEIGHT, "Clear", clear_grid)
]

# Create speed slider
slider = Slider(
    WIDTH // 4, 
    HEIGHT - BUTTON_HEIGHT - SLIDER_HEIGHT - BUTTON_MARGIN * 3, 
    WIDTH // 2, 
    SLIDER_HEIGHT, 
    1, 30, generation_speed, 
    "Speed (gen/sec)"
)

# Main game loop
running_game = True
while running_game:
    current_time = time.time()
    mouse_pos = pygame.mouse.get_pos()
    
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running_game = False
        
        # Handle UI element events
        for button in buttons:
            if button.handle_event(event):
                break
                
        slider.handle_event(event)
        
        # Handle cell toggling
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            x, y = mouse_pos[0] // CELL_SIZE, mouse_pos[1] // CELL_SIZE
            if 0 <= x < GRID_WIDTH and 0 <= y < GRID_HEIGHT:
                grid[y][x] = 1 - grid[y][x]  # Toggle cell
    
    # Update generation speed from slider
    generation_speed = slider.value
    
    # Update game state if running
    if running and current_time - last_update_time > 1.0 / generation_speed:
        update_grid()
        generation += 1
        last_update_time = current_time
    
    # Update UI elements
    for button in buttons:
        button.update(mouse_pos)
    
    slider.update(mouse_pos)
    
    # Draw everything
    screen.fill(BACKGROUND)
    
    # Draw cells
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            rect = pygame.Rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            if grid[y][x] == 1:
                pygame.draw.rect(screen, WHITE, rect)
            pygame.draw.rect(screen, GRID_COLOR, rect, 1)
    
    # Draw UI background
    control_area = pygame.Rect(0, HEIGHT - 100, WIDTH, 100)
    pygame.draw.rect(screen, (40, 40, 40), control_area)
    pygame.draw.line(screen, GRAY, (0, HEIGHT - 100), (WIDTH, HEIGHT - 100), 2)
    
    # Draw buttons
    for button in buttons:
        button.draw()
    
    # Draw slider
    slider.draw()
    
    # Draw generation counter
    gen_text = font.render(f"Generation: {generation}", True, WHITE)
    screen.blit(gen_text, (20, HEIGHT - 90))
    
    # Draw state text
    state_text = font.render("Running" if running else "Paused", True, GREEN if running else RED)
    screen.blit(state_text, (20, HEIGHT - 60))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()