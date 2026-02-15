# TypeScape

## Table of Contents
0. [Introduction](#introduction)
1. [Quick-start](#quick-start)
2. [Sample Project](#sample-project)

## Introduction

TypeScape is a simple browser-based 2D game engine written in [TypeScript](https://www.typescriptlang.org/).

## Quick-start

If you already understand how game engines work, TypeScape should be easy to pick up. To get started:

1. Create some new `GameObject` files under `/resources/ts/Classes/GameObjects/` and make custom classes that extend the built-in `GameObject` class.
2. Instantiate those `GameObject` classes inside of the starter `PlayState` that has been created for you. You can create as many `State` classes as you would like to handle things like main menus, credits, pause screens, etc.
3. The `Game` class will then handle the built-in `update` and `render` functions of those `GameObject` instances for as long as the `PlayState` is active.

The engine is not hidden away in a separate "vendor" folder, so you're free to edit the core engine files as you work to make the engine's functionality suit your game. Feel free to dig around all of the `.ts` files located under `/resources/ts` to understand the engine's inner workings.

## Sample Project

To get a better understanding of how to use TypeScape, follow along with this simple tutorial to create your first TypeScape project.
