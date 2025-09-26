interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="min-h-screen bg-gloss-metal dark:bg-gloss-metal-dark py-8 transition-colors">
      {children}
    </div>
  );
};
