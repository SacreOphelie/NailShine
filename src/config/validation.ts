export const checkString = (text: string) =>{
    return text && text.trim().length > 1;
};

export const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const checkMdp = (password) => {
  const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  
  return password && mdpRegex.test(password);
};