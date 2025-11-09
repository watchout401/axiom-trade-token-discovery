import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  SortConfig,
  TokenFilters,
  TokenStatusFilter,
  TokenTab,
  UIState,
} from "@/types/token";

const defaultFilters: TokenFilters = {
  minMarketCap: 0,
  platforms: {
    raydium: true,
    "pump.fun": true,
    meteora: true,
  },
  status: "all",
};

const initialState: UIState = {
  sortConfig: {
    key: "marketCap",
    order: "desc",
  },
  activeTab: "new",
  selectedTokenId: null,
  modals: {
    tokenDetails: { isOpen: false },
    filter: { isOpen: false },
    quickBuy: { isOpen: false },
  },
  filters: {
    ...defaultFilters,
    platforms: { ...defaultFilters.platforms },
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TokenTab | "discover">) {
      state.activeTab = action.payload;
    },
    setSortConfig(state, action: PayloadAction<SortConfig>) {
      state.sortConfig = action.payload;
    },
    selectToken(state, action: PayloadAction<string | null>) {
      state.selectedTokenId = action.payload;
    },
    setModalOpen(
      state,
      action: PayloadAction<{ modal: keyof UIState["modals"]; value: boolean }>,
    ) {
      const { modal, value } = action.payload;
      state.modals[modal].isOpen = value;
    },
    resetModals(state) {
      state.modals = {
        tokenDetails: { isOpen: false },
        filter: { isOpen: false },
        quickBuy: { isOpen: false },
      };
    },
    applyFilters(state, action: PayloadAction<Partial<TokenFilters>>) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        platforms: action.payload.platforms
          ? { ...state.filters.platforms, ...action.payload.platforms }
          : state.filters.platforms,
      };
    },
    setStatusFilter(state, action: PayloadAction<TokenStatusFilter>) {
      state.filters.status = action.payload;
    },
    resetFilters(state) {
      state.filters = {
        ...defaultFilters,
        platforms: { ...defaultFilters.platforms },
      };
    },
  },
});

export const {
  setActiveTab,
  setSortConfig,
  selectToken,
  setModalOpen,
  resetModals,
  applyFilters,
  setStatusFilter,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;

