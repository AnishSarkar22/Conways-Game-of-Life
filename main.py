# Conway's Game of Life in Python

import pygame
import random

pygame.init()

BLACK = (0, 0, 0)
GREY = (128, 128, 128)
YELLOW = (255, 255, 0)

WIDTH, HEIGHT = 800, 800
TILE_SIZE = 20
GRID_WIDTH = WIDTH // TILE_SIZE
GRID_HEIGHT = HEIGHT // TILE_SIZE
FPS = 60

screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

def gen(num):
    return {(random.randrange(0, GRID_HEIGHT), random.randrange(0, GRID_WIDTH)) for _ in range(num)}

def draw_grid(positions):
    for col, row in positions:
        top_left = (col * TILE_SIZE, row * TILE_SIZE)
        pygame.draw.rect(screen, YELLOW, (*top_left, TILE_SIZE, TILE_SIZE))

    for i in range(GRID_HEIGHT + 1):
        pygame.draw.line(screen, BLACK, (0, i * TILE_SIZE), (WIDTH, i * TILE_SIZE))
    for i in range(GRID_WIDTH + 1):
        pygame.draw.line(screen, BLACK, (i * TILE_SIZE, 0), (i * TILE_SIZE, HEIGHT))

def adjust_grid(positions):
    all_neighbors = set()
    new_positions = set()

    for position in positions:
        neighbors = list(filter(lambda x: x in positions, get_neighbors(position)))
        all_neighbors.update(get_neighbors(position))

        if len(neighbors) in [2, 3]:
            new_positions.add(position)
    
    for position in all_neighbors:
        neighbors = list(filter(lambda x: x in positions, get_neighbors(position)))

        if len(neighbors) == 3:
            new_positions.add(position)
    
    return new_positions

def get_neighbors(pos):
    x, y = pos
    for dx in [-1, 0, 1]:
        if 0 <= x + dx < GRID_WIDTH:
            for dy in [-1, 0, 1]:
                if 0 <= y + dy < GRID_HEIGHT and (dx != 0 or dy != 0):
                    yield (x + dx, y + dy)

def main():
    running = True
    playing = False
    count = 0
    update_freq = 120

    positions = set()
    while running:
        clock.tick(FPS)

        if playing:
            count += 1
        
        if count >= update_freq:
            count = 0
            positions = adjust_grid(positions)

        pygame.display.set_caption("Playing" if playing else "Paused")

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            elif event.type == pygame.MOUSEBUTTONDOWN:
                x, y = pygame.mouse.get_pos()
                col, row = x // TILE_SIZE, y // TILE_SIZE
                pos = (col, row)

                if pos in positions:
                    positions.remove(pos)
                else:
                    positions.add(pos)
            
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    playing = not playing
                elif event.key == pygame.K_c:
                    positions.clear()
                    playing = False
                    count = 0
                elif event.key == pygame.K_g:
                    positions = gen(random.randrange(4, 10) * GRID_WIDTH)
    
        screen.fill(GREY)
        draw_grid(positions)
        pygame.display.update()

    pygame.quit()

if __name__ == "__main__":
    main()