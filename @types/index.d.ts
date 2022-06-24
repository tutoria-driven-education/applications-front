export interface Amounts {
  total: number;
  analyticCurriculum: number;
  stageBehavioral: number;
  match: number;
  notMatch: number;
  giveUp: number;
}

export interface allApplications {
  amounts: Amounts;
}

export interface ApplicationsInCompanyPartner {
  amounts: Amounts;
}

export interface AmountApplicationsInOtherCompany {
  amounts: Amounts;
}

export interface Mentor {
  name: string;
  amounts: Amounts;
}

export interface ApplicationResponse {
  allApplications: allApplications;
  applicationsInCompanyPartner: ApplicationsInCompanyPartner;
  applicationsInOtherCompany: AmountApplicationsInOtherCompany;
  mentors: Mentor[];
}
