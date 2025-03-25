export interface DentistItem {
    _id: string,
    name: string,
    yearsOfExperience: number,
    areaOfExpertise: string[],
    picture: string,
    __v: number,
    id: string
  }
  
export interface DentistJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: DentistItem[]
  }
export interface DentistJson1 {
    success: boolean,
    count: number,
    pagination: Object,
    data: DentistItem
}

export interface BookingItem {
    _id: string,
    description: string,
    apptDate: string,
    user: string,
    dentist: DentistItem,
    createdAt: string,
    __v: string,
    nameLastname: string,
    tel: string,
  }
