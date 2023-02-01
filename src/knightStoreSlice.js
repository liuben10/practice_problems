import { createSlice } from '@reduxjs/toolkit'

export const knightSlice = createSlice({
    name: 'knightSlice',
    initialState: {
        programCounter: 0,
        currentStartLine: 0,
        currentEndLine: 0,
        programState: {},
    },
    reducers: {
        // TODO https://react-redux.js.org/tutorials/quick-start
        next(state, action) {
            state.programCounter += 1;
        },
        play(state, action) {
            console.log("Play was pressed");
        },
        reset(state) {
           state.programCounter = 0;
        },

    },
  })
  
  // Action creators are generated for each case reducer function
export const {next, play, reset} = knightSlice.actions

export default knightSlice.reducer