export const getSlug = (cityName, cityId) => {
    return `${cityName.toLowerCase().replace(' ', '-')}-${cityId}`
}