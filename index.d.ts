declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
  }
declare module "@/views" {
    import { DefineComponent } from "vue";
    export const AnalysisSection: DefineComponent<{}, {}, any>;
    export const FiltersSection: DefineComponent<{}, {}, any>;
    export const HistoricalProfitabilitySection: DefineComponent<{}, {}, any>;
    export const ProfitabilityYTDSection: DefineComponent<{}, {}, any>;
    export const ComponentsPDF: DefineComponent<{}, {}, any>;
  }

declare module "@/stores" {
    import { StoreDefinition } from "pinia";
  
    export const useFilterSection: StoreDefinition;
    export const useProfitabilityAnalysis: StoreDefinition;
    export const useProfitabilityYTD: StoreDefinition;
    export const useHistoricalProfitability: StoreDefinition;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}
