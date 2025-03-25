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

export interface BookingItem {
    nameLastname: string,
    tel: string,
    dentist: string,
    bookDate: string,
  }