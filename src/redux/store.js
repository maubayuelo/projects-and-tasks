import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./supabaseClient"; // Import Supabase client

// Async thunk to fetch projects from Supabase
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const { data, error } = await supabase.from("projects").select("*");

  console.log("Supabase response...", data, error); // Debugging Log

  if (error) {
    throw new Error(error.message);
  }

  return data; // Return projects array from Supabase
});


// Async thunk to add a new project to Supabase
export const addProjectToBackend = createAsyncThunk(
  "projects/addProjectToBackend",
  async (project, { rejectWithValue }) => {
    console.log("Sending project to Supabase:", project); // Debugging log

    const { data, error } = await supabase
      .from("projects")
      .insert([{ name: project.name, description: project.description }])
      .select(); // Ensures we return the inserted data

    if (error) {
      console.error("Error inserting project:", error.message);
      return rejectWithValue(error.message);
    }

    console.log("Project added successfully:", data); // Log response
    return data?.[0] ?? {}; // Prevents returning null
  }
);




// Async thunk to delete a project from Supabase
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return rejectWithValue(error.message);
    }

    return id; // Return the deleted project ID
  }
);

// Redux slice
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProjectToBackend.fulfilled, (state, action) => {
        if (action.payload?.id) {
          state.data.push(action.payload); // Only push valid objects
        } else {
          console.warn("Invalid project data received:", action.payload);
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.data = state.data.filter((project) => project.id !== action.payload);
      });
  },
});

// Configure store
const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
  },
});

export default store;
