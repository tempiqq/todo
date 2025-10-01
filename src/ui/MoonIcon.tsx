interface MoonIconProps {
  className?: string;
}

export const MoonIcon = ({ className }: MoonIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="grey"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`
        hover:scale-110 
        transition-all 
        duration-300 
        ${className || ''}
      `}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
};
