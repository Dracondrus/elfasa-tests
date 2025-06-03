

export interface questions {
     id: number,
    question: string,
    options: string[],
    correctAnswer: string
}

export interface QuestionsLike {
   id:number,
   title:string,
   questions: questions[]
}

 
    
export const falsafa: QuestionsLike = {
    id: 1,
    title: "falsafa",
    questions: [
         {
        id: 1,
        question: "«1Filosofiya» atamasi va u ifoda etadigan bilimlar majmui Qadimgi Yunoniston va Rimda eramizdan avvalgi ... yuz bergan buyuk yuksalish natijasi sifatida yuzaga kelgan edi. Nuqtalar o'rnini to'ldiring.",
        options: [
            "IV-III asrlarda.",
            "V-IV asrlarda.",
            "VII-III asrlarda.",
            "To'g'ri javob ko'rsatilmagan."
        ],
        correctAnswer: "VII-III asrlarda."
    },
        {
        id: 2,
        question: "«2Filosofiya» atamasi va u ifoda etadigan bilimlar majmui Qadimgi Yunoniston va Rimda eramizdan avvalgi ... yuz bergan buyuk yuksalish natijasi sifatida yuzaga kelgan edi. Nuqtalar o'rnini to'ldiring.",
        options: [
            "IV-III asrlarda.",
            "V-IV asrlarda.",
            "VII-III asrlarda.",
            "To'g'ri javob ko'rsatilmagan."
        ],
        correctAnswer: "VII-III asrlarda."
    },
        {
        id: 3,
        question: "«3Filosofiya» atamasi va u ifoda etadigan bilimlar majmui Qadimgi Yunoniston va Rimda eramizdan avvalgi ... yuz bergan buyuk yuksalish natijasi sifatida yuzaga kelgan edi. Nuqtalar o'rnini to'ldiring.",
        options: [
            "IV-III asrlarda.",
            "V-IV asrlarda.",
            "VII-III asrlarda.",
            "To'g'ri javob ko'rsatilmagan."
        ],
        correctAnswer: "VII-III asrlarda."
    },
    ]
}