

export type R = Record<string,any>;

export type properties = {
    _id:string;
    title:string;
    description:string;
    price:string;
    images:string[];
    duration:string | null;
    documents?:[]
    address:string
}



export type DocumentTypes = 
  'FamilyReceipt' | 'SurveyPlan' | 'Layout' | 'Affidavidit' | 
  'Agreement' | 'CofO' | 'PowerOfAttourney' | 'GovConsent';

