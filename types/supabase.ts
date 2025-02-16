export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ClientType = {
  dateOnBoarded: string;
  fullName: string;
  companyName: string;
  tin: null | number;
  phoneNumber: string;
  emailUsedForComms: string;
  emailUsedForLogin: string;
  address: string;
  paymentStatus: string;
  businessCategory: string;
  vrn: string;
  certificatePassword: string;
  service: string;
  serialNumber?: string | null;
  documentLink?: string | null;
  amountPaid?: number | null;
  region?: string | null;
  platform: string;
  monthOnBoard: string;
  vip: string;
  clientID: number;
};

export type OperatorType = {
  operatorName: string;
  operatorPhoneNumber: string;
  operatorEmail: string;
  clientID: string;
  Client: any;
};

export type LeadType = {
  date: string;
  fullName: string;
  companyName: string;
  tin: null | string;
  phoneNumber: string;
  emailAddress: string;
  addedBy: string;
  reasons: string;
  actionTaken: string;
  location: string;
  progress: string;
  status: string;
  platform: string;
  monthOnBoard: string;
  vip: string;
  leadID: number;
};

export type Database = {
  public: {
    Tables: {
      client: {
        Row: {
          actionTaken: string | null;
          addedBy: string | null;
          company: string | null;
          date: string | null;
          emailAddress: string | null;
          fullName: string | null;
          monthOnBoard: string | null;
          phoneNumber: string | null;
          platform: string | null;
          progress: string | null;
          reasons: string | null;
          status: string | null;
          tin: string | null;
          vip: string | null;
        };
        Insert: {
          actionTaken?: string | null;
          addedBy?: string | null;
          company?: string | null;
          date?: string | null;
          emailAddress?: string | null;
          fullName?: string | null;
          monthOnBoard?: string | null;
          phoneNumber?: string | null;
          platform?: string | null;
          progress?: string | null;
          reasons?: string | null;
          status?: string | null;
          tin?: string | null;
          vip?: string | null;
        };
        Update: {
          actionTaken?: string | null;
          addedBy?: string | null;
          company?: string | null;
          date?: string | null;
          emailAddress?: string | null;
          fullName?: string | null;
          monthOnBoard?: string | null;
          phoneNumber?: string | null;
          platform?: string | null;
          progress?: string | null;
          reasons?: string | null;
          status?: string | null;
          tin?: string | null;
          vip?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
