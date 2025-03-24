export interface DentistJson {
    success: boolean,
    data: DentistData[]
}

export interface DentistData {
    _id: string,
    name: string,
    yearsOfExperience: number,
    areasOfExpertise: string[],
    __v: number
}