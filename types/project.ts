export interface ProjectInterface {
  addedBy: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  projectComment?: any[];
  projectName: string;
  projectDescription: string;
  projectType: string;
  projectIndustry?: string;
  otherProjectIndustry?: string;
  projectPriority: string;
  projectContact: any[];
  projectStatus: string;
  projectStartDate?: string | Date;
  projectEndDate?: string | Date;
  projectMilestones: any[];
  projectIncome: number;
  projectExpense: number;
  projectDocuments: any[];
}

export interface UpdateProjectInterface {
  projectName?: string;
  projectDescription?: string;
  projectType?: string;
  projectIndustry?: string;
  otherProjectIndustry?: string;
  projectPriority?: string;
  projectContact?: any[];
  projectStatus?: string;
  projectStartDate?: string | Date;
  projectEndDate?: string | Date;
  projectIncome?: number | null;
  projectExpense?: number | null;
  projectDocuments?: any[];
  projectMilestones: any[];
}

export interface ProjectResponseInterface {
  projectID: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  projectIndustry: string;
  otherProjectIndustry: string;
  projectPriority: string;
  projectContact: string[];
  projectStatus: string;
  projectStartDate: string | Date;
  projectEndDate: string | Date;
  ProjectComment: ProjectComment[];
  projectMilestones: {
    milestone: string;
    completed: boolean;
    dateCompleted?: Date | string;
  }[];
  projectIncome: number | null;
  projectExpense: number | null;
  projectDocuments: {
    documentLink: string;
    documentName: string;
  }[];
  addedBy: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ProjectComment {
  commentText: string;
  commentDate: Date;
  commentedBy: string | null;
}
