# create a pygame app
# with an infinite coordinate plane
# whose center can be moved

# import modules
import pygame
import math
import random
import sys
import os
import time
import numpy
import pygame.gfxdraw
import threading
import random
from pygame.locals import *
from math import *
from random import *
from sys import *
from os import *
from time import *
from numpy import *
from threading import *
pygame.init()

# get the desctop size
infoObject = pygame.display.Info()

# set up the screen
screen = pygame.display.set_mode((0, 0), pygame.RESIZABLE)
pygame.display.set_caption("Complex Calculator")
clock = pygame.time.Clock()

# set up the colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
CYAN = (0, 255, 255)
MAGENTA = (255, 0, 255)
ORANGE = (255, 128, 0)
PURPLE = (128, 0, 128)
BROWN = (128, 64, 0)
GRAY = (128, 128, 128)
DARKGRAY = (64, 64, 64)
LIGHTGRAY = (192, 192, 192)
DARKRED = (128, 0, 0)
DARKGREEN = (0, 128, 0)

# set up the fonts
basicFont = pygame.font.SysFont(None, 48)

# set up the variables for the coordinate plane to be moved around the screen and resized
x = 0
y = 0

# set up the function to draw the coordinate plane
def draw_coordinate_plane():
    # draw the coordinate plane
    global x
    global y
    # draw the x axis
    pygame.draw.line(screen, BLACK, (0, screen.get_height() / 2 + y), (screen.get_width(), screen.get_height() / 2 + y), 1)
    # draw the y axis
    pygame.draw.line(screen, BLACK, (screen.get_width() / 2 + x, 0), (screen.get_width() / 2 + x, screen.get_height()), 1)
    # draw the x axis ticks
    for i in range(0, screen.get_width(), 10):
        pygame.draw.line(screen, BLACK, (i, screen.get_height() / 2 + y - 5), (i, screen.get_height() / 2 + y + 5), 1)
    # draw the y axis ticks
    for i in range(0, screen.get_height(), 10):
        pygame.draw.line(screen, BLACK, (screen.get_width() / 2 + x - 5, i), (screen.get_width() / 2 + x + 5, i), 1)

# set up the function to move the coordinate plane
def move_coordinate_plane(x_move, y_move):
    # move the coordinate plane
    global x
    global y
    x += x_move
    y += y_move

# set up the function to draw the screen
def draw_screen():
    # draw the screen
    screen.fill(WHITE)
    draw_coordinate_plane()

# set up the function to handle key events
def handle_key_events( event ):
    # handle key events
    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            move_coordinate_plane(-10, 0)
        elif event.key == pygame.K_RIGHT:
            move_coordinate_plane(10, 0)
        elif event.key == pygame.K_UP:
            move_coordinate_plane(0, -10)
        elif event.key == pygame.K_DOWN:
            move_coordinate_plane(0, 10)
        draw_screen()
        pygame.display.update()

# set up the function to handle events
def handle_events():
    # handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.MOUSEBUTTONDOWN or event.type == pygame.MOUSEBUTTONUP or event.type == pygame.MOUSEMOTION:
            handle_mouse_events(event)
        elif event.type == pygame.KEYDOWN:
            handle_key_events(event)

# set up the function to handle mouse events
def handle_mouse_events( event ):
    # handle mouse events
    if event.type == pygame.MOUSEBUTTONDOWN:
        if event.button == 4:
            move_coordinate_plane(0, -10)
        elif event.button == 5:
            move_coordinate_plane(0, 10)
        draw_screen()
        pygame.display.update()

            
def main():
    # main function
    draw_screen()
    pygame.display.update()
    while True:
        handle_events()
        clock.tick(60)


if __name__ == "__main__":
    main()
