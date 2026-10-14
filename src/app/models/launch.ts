
export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number | null;
  rocket: Rocket;
  ships: string[];
  telemetry: Telemetry;
  launch_site: LaunchSite;
  launch_success: boolean;
  launch_failure_details?: LaunchFailureDetails;
  links: LaunchLinks;
  details: string | null;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  timeline: LaunchTimeline | null;
}

export type LaunchTimeline = Partial<Record<string, number>>;

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: FirstStage;
  second_stage: SecondStage;
  fairings: Fairings | null;
}

export interface FirstStage {
  cores: Core[];
}

export interface Core {
  core_serial: string;
  flight: number;
  block: number | null;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  land_success: boolean | null;
  landing_intent: boolean;
  landing_type: string | null;
  landing_vehicle: string | null;
}

export interface SecondStage {
  block: number | null;
  payloads: Payload[];
}

export interface Payload {
  payload_id: string;
  norad_id: number[];
  cap_serial?: string;
  reused: boolean;
  customers: string[];
  nationality?: string;
  manufacturer?: string | null;
  payload_type: string;
  payload_mass_kg: number | null;
  payload_mass_lbs: number | null;
  orbit: string;
  orbit_params: OrbitParams;
  mass_returned_kg?: number | null;
  mass_returned_lbs?: number | null;
  flight_time_sec?: number;
  cargo_manifest?: string | null;
}

export interface OrbitParams {
  reference_system: string;
  regime: string | null;
  longitude: number | null;
  semi_major_axis_km: number | null;
  eccentricity: number | null;
  periapsis_km: number | null;
  apoapsis_km: number | null;
  inclination_deg: number | null;
  period_min: number | null;
  lifespan_years: number | null;
  epoch: string | null;
  mean_motion: number | null;
  raan: number | null;
  arg_of_pericenter?: number | null;
  mean_anomaly?: number | null;
}

export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean | null;
  ship: string | null;
}

export interface Telemetry {
  flight_club: string | null;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface LaunchFailureDetails {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface LaunchLinks {
  mission_patch: string;
  mission_patch_small: string;
  reddit_campaign: string | null;
  reddit_launch: string | null;
  reddit_recovery: string | null;
  reddit_media: string | null;
  presskit: string | null;
  article_link: string;
  wikipedia: string;
  video_link: string;
  youtube_id: string;
  flickr_images: string[];
}
