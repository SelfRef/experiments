# Rust

## Entrypoint
- main.rs - for user application
- lib.rs - for library

## Package manager
- `cargo`
- uses `Cargo.toml` file as config
- `cargo new <name>` to create project

## Compilation
- by `rustc` command
- by `cargo build` or `cargo run` command

## Entrypoint
- `main()` function

## Data types
- integer
	- unsigned: `uN`
	- signed: `iN`
	- N is number of bits eg. `u8`
	- `usize` & `isize` are target (CPU) specific
- character
  - `char`
- floating point
  - `f32`
  - `f64` (default)
- boolean
  - `bool`

## Operators
- `+` or `+=`
- `-` or `-=`
- `*` or `*=`
- `/` or `/=`
- `%`

## Syntax
Name | Example
--- | ---
Immutable variable | `let a: u8 = 123;`
Mutable variable | `let mut a: u8 = 123;`
Function | 