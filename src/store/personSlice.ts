import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, options } from './movies/api';


export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  imdb_id: string | null;
  homepage: string | null;
  deathday: string | null;
}


interface personState {
  currentPerson: Person | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: personState = {
  currentPerson: null,
  status: 'idle',
  error: null,
};


export const fetchPersonById = createAsyncThunk<
  Person,
  { id: number },
  { rejectValue: string }
>('person/fetchPersonById', async ({ id }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/person/${id}?language=en-US`, options);
    if (res.status !== 200) throw new Error('Failed to fetch person');
    return res.data as Person;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Unknown error');
  }
});

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    clearPerson: (state) => {
      state.currentPerson = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPersonById.fulfilled, (state, action: PayloadAction<Person>) => {
        state.status = 'succeeded';
        state.currentPerson = action.payload;
      })
      .addCase(fetchPersonById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load person data';
      });
  },
});

export const { clearPerson } = personSlice.actions;
export default personSlice.reducer;
