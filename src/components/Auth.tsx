import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ELFASA from "../assets/elfasa__logotype.jpg"
const Auth: React.FC = () => {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sheetdbUrl = 'https://sheetdb.io/api/v1/390q4prnd80er';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.get(sheetdbUrl);
      const passwords = res.data;
      const found = passwords.find((item: any) => item.password === inputPassword);

      if (!found) {
        triggerError("Неверный пароль");
        return;
      }

      await axios.delete(sheetdbUrl, {
        params: {
          column: 'id',
          value: found.id
        }
      });

      localStorage.setItem('user', inputLogin);
      navigate("/");
    } catch {
      triggerError("Ошибка сервера");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setShowError(true);
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="auth-logo"><img src={ELFASA} width={40} height={40} alt="" /> ELFASA</div>
        
        <div className="input-group">
          <label htmlFor="login"> Логин</label>
          <input
            id="login"
            type="text"
            placeholder="Введите ваш логин"
            value={inputLogin}
            onChange={(e) => setInputLogin(e.target.value)}
            className="auth-input"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            placeholder="Введите ваш пароль"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="auth-input"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!inputPassword || !inputLogin || isLoading}
          className="auth-button"
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            "Войти"
          )}
        </button>
      </form>

      {showError && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default Auth;