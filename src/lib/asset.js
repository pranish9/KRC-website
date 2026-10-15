// Builds a path to a file in /public that works on any host or sub-folder.
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')
