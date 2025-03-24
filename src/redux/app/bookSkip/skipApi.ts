import { createApi } from "@reduxjs/toolkit/query/react";
import generalApiSlice from "../api/generalSlice";

// Define Skip type
export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  vat: number;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  image:string
}

export const skipApi = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkipsByLocation: builder.query<
      Skip[],
      { postcode: string; area: string }
    >({
      query: ({ postcode, area }) =>
        `skips/by-location?postcode=${postcode}&area=${area}`,
    }),
  }),
  overrideExisting: false, // Optional: Ensure this does not override other endpoints
});

export const { useGetSkipsByLocationQuery } = skipApi;
