import GeneralPhysician from './General_physician.png'; 
import Gynecologist from './Gynecologist.png';
import Dermatologist from './Dermatologist.png';
import Pediatricians from './Pediatricians.png';
import doc1 from './doc1.png' 
import doc2 from './doc2.png' 
import doc3 from './doc3.png' 
import doc4 from './doc4.png' 
import doc5 from './doc5.png' 
export const SpecialityData = [
    {
        speciality: 'General Physician',
        image: GeneralPhysician,
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist,
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist,
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians,
    },
];
export const doctors=[
    {
        _id:"doc1",
        name:"Dr. Richard James",
        image:doc1,
        speciality:"General physician",
        degree:"MBBS",
        experience:"4 years",
        fees:50

    },
    {
        _id:"doc2",
        name:"Dr. Racheal Jones",
        image:doc2,
        speciality:"Gynecologist",
        degree:"MBBS",
        experience:"3 years",
        fees:100

    },
    {
        _id:"doc3",
        name:"Dr. Donald James",
        image:doc3,
        speciality:"Dermatologist",
        degree:"MBBS",
        experience:"4 years",
        fees:150

    },
    {
        _id:"doc4",
        name:"Dr. Ruth  Alfred",
        image:doc4,
        speciality:"Pediatricians",
        degree:"MBBS",
        experience:"4 years",
        fees:100
,

    },

    {
        _id:"doc5",
        name:"Dr. Drey Alfred",
        image:doc5,
        speciality:"Gynecologist",
        degree:"MBBS",
        experience:"4 years",
        fees:50

    },
  
]