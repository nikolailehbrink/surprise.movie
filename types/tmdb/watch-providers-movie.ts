export type StreamingProviders = {
  results: StreamingProvider[];
};

export type StreamingProvider = {
  display_priorities: { [key: string]: number };
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
};
