import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";


const layout = async ({ children }: { children: React.ReactNode }) => {
  // const session = await getServerSession(authOptions as NextAuthOptions);

  // if (!session?.user?.email) {
  //   redirect("/auth/login");
  // }

  return (
    <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
