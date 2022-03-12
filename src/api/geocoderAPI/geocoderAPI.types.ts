export type Address = {
  city: string
  country: string
  country_code: string
  district: string
  house_number: string
  municipality: string
  postcode: string
  road: string
  state: string
}

export type Location = {
  address: Address
  boundingbox: string[]
  display_name: string
  lat: string
  licence: string
  lon: string
  osm_id: string
  osm_type: string
  place_id: string
}

export type AutocompleteResponse = { display_place: string }[]
export type AutocompleteResult = { value: string }[]
