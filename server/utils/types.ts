import { Request, Response, NextFunction } from 'express';

export type generalRequestBody = Record<string, any>

export enum PropertyDocuments {
  FamilyReceipt = 'FamilyReceipt',
  SurveyPlan = 'SurveyPlan',
  Layout = 'Layout',
  Affidavidit = 'Affidavit',
  Agreement = 'Agreement',
  CofO = 'CofO',
  PowerOfAttourney = 'PowerOfAttorney',
  GovConsent = 'GovConsent',
}

export enum PropertyVerification {
  Pending = 'Pending',
  Verified = 'Verfied',
  Rejected = 'Rejected'
}

export interface GoogleAuthResponse {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
}

export type ExpressController = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => any;

export type fnRequest = (
  req: Request,
  res: Response,
) => Promise<any>;