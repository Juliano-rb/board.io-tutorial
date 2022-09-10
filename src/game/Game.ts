/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { Game } from 'boardgame.io'
import { INVALID_MOVE } from 'boardgame.io/core'

export interface TicTacToeState {
  cells: (string)[];
}

// Return true if `cells` is in a winning configuration.
function IsVictory(cells: (null | string)[]) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const isRowComplete = (row: number[]) => {
    const symbols = row.map((i) => cells[i])
    return symbols.every((i) => i !== null && i === symbols[0])
  }

  return positions.map(isRowComplete).some((i) => i === true)
}

// Return true if all `cells` are occupied.
function IsDraw(cells: (null | string)[]) {
  return cells.filter((c) => c === null).length === 0
}

export const TicTacToe: Game<TicTacToeState> = {
  name: 'JogoDaVelha',
  setup: () => ({ cells: Array(9).fill('') }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  minPlayers: 2,
  maxPlayers: 2,

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE
      }

      G.cells[id] = ctx.currentPlayer
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }
    }
    if (IsDraw(G.cells)) {
      return { draw: true }
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      const moves = []
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] })
        }
      }
      return moves
    },
  },
}