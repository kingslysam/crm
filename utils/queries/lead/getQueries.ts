import axios from "axios";
import leadsData from "../../../public/dummyData/leads.json";
import { LeadResponseType } from "@/types/lead";

export async function getAllLeads() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/all`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getAllLeadsByEmployee(employeeName: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/all/addedBy?name=${employeeName}`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getAllLeadsByZone(zone: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/all/zone?name=${zone}`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getLeadAnalyticsWithStartAndEndDate(startDate: string, endDate: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/leads/lead-analytics/time?startDate=${startDate}&endDate=${endDate}`
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

