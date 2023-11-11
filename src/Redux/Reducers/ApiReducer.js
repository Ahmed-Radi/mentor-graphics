import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_key = "75c7a39bc89a465cbab192915231111";

export const getDataReducer = createAsyncThunk("weatherData/getData",
    async (args = "Egypt", thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const data = await axios.get(
                `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${api_key}&q=${args.country}&format=json&num_of_days=5`,
                {
                    headers: {
                        "Transfer-Encoding": "chunked",
                        Connection: "keep-alive",
                        Vary: "Accept-Encoding",
                        "CDN-PullZone": "61832",
                        "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
                        "CDN-RequestCountryCode": "GB",
                        "x-wwo-qpd-left": "469",
                        "CDN-ProxyVer": "1.02",
                        "CDN-RequestPullSuccess": "True",
                        "CDN-RequestPullCode": "200",
                        "CDN-CachedAt": "05/30/2022 06:57:30",
                        "CDN-EdgeStorageId": "595",
                        "CDN-Status": "200",
                        "CDN-RequestId": "35ff884b480818436313de9880c34b68",
                        "CDN-Cache": "EXPIRED",
                        "Cache-Control": "public, max-age=180",
                        "Content-Type": "application/json",
                        Date: "Mon, 30 May 2022 06:57:30 GMT",
                        Server: "BunnyCDN-CZ1-595"
                    }
                }
            )
            .then((res) => res.data)
            .catch((e) => console.log("error:", e));
            return data;
            } catch (error) {
                return rejectWithValue(error.message);
            }
        }
);

const initialState = { getData: null, error: false, isLoading: true };

const getDataSlice = createSlice({
    name: "weatherData",
    initialState,
    extraReducers: {
        [getDataReducer.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getDataReducer.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.getData = action?.payload?.data;
        },
        [getDataReducer.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = true;
            state.getData = action?.payload?.data;
        }
    }
});

export default getDataSlice.reducer;
