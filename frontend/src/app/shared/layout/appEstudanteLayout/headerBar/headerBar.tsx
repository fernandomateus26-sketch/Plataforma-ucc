import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import styles from "./headerBar.module.css";
import { useSidebar } from "../../../context/sidebarContext";
import { useTheme } from "../../../context/themeContext";

export const HeaderBar: React.FC = () => {
  const { toggleMobile } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("Olá");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock student details
  const student = {
    name: "Fernando Mateus",
    course: "Engenharia Informática",
    registry: "20231045",
    avatar: "", // empty for initials fallback
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Nota Lançada",
      desc: "Sua nota de Álgebra Linear foi publicada: 17/20.",
      time: "Há 10 min",
      icon: <CheckCircleOutlined className={styles.notifIconSuccess} />,
    },
    {
      id: 2,
      type: "info",
      title: "Horário Alterado",
      desc: "A aula de Programação Web de amanhã será na Sala A-204.",
      time: "Há 2 horas",
      icon: <InfoCircleOutlined className={styles.notifIconInfo} />,
    },
    {
      id: 3,
      type: "warning",
      title: "Biblioteca Pendente",
      desc: "Devolução do livro 'Clean Code' vence em 2 dias.",
      time: "Há 1 dia",
      icon: <WarningOutlined className={styles.notifIconWarning} />,
    },
  ];

  // Dynamic greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map route path to readable breadcrumbs
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const pathsMap: { [key: string]: string } = {
      "/paginaInicial": "Página Inicial",
      "/disciplinas": "Minhas Disciplinas",
      "/notas": "Notas e Faltas",
      "/horarios": "Horários de Aula",
      "/requerimentos": "Requerimentos Acadêmicos",
      "/biblioteca": "Biblioteca Virtual",
      "/financeiro": "Gestão Financeira",
      "/perfil": "Meu Perfil Acadêmico",
    };
    return pathsMap[path] || "Portal do Estudante";
  };

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  };

  return (
    <header className={styles.header}>
      {/* Left side: Menu Toggle and Breadcrumbs */}
      <div className={styles.headerLeft}>
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobile}
          aria-label="Abrir menu"
        >
          <MenuOutlined />
        </button>

        <div className={styles.breadcrumbContainer}>
          <span className={styles.breadcrumbRoot}>Portal UCC</span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{getBreadcrumbs()}</span>
        </div>
      </div>

      {/* Right side: Student greeting, notifications, profile */}
      <div className={styles.headerRight}>
        {/* Dynamic Greeting */}
        <span className={styles.greetingText}>
          {greeting}, <strong className={styles.studentName}>{student.name.split(" ")[0]}</strong>!
        </span>

        {/* Theme Toggle Button */}
        <button
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label="Alternar tema"
          title={theme === "light" ? "Mudar para tema escuro" : "Mudar para tema claro"}
        >
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </button>

        {/* Notifications Popover */}
        <div className={styles.relativeContainer} ref={notificationsRef}>
          <button
            className={`${styles.iconButton} ${showNotifications ? styles.iconButtonActive : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificações"
          >
            <BellOutlined />
            <span className={styles.notificationBadge}>{notifications.length}</span>
          </button>

          {showNotifications && (
            <div className={styles.dropdownNotifications}>
              <div className={styles.dropdownHeader}>
                <h3>Notificações</h3>
                <span className={styles.markAllRead}>Marcar todas como lidas</span>
              </div>
              <div className={styles.notificationsList}>
                {notifications.map((notif) => (
                  <div key={notif.id} className={styles.notificationItem}>
                    <div className={styles.notifIconWrapper}>{notif.icon}</div>
                    <div className={styles.notifContent}>
                      <h4 className={styles.notifTitle}>{notif.title}</h4>
                      <p className={styles.notifDesc}>{notif.desc}</p>
                      <span className={styles.notifTime}>{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <button className={styles.viewAllButton}>Ver todas as notificações</button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Profile Popover */}
        <div className={styles.relativeContainer} ref={profileRef}>
          <button
            className={styles.profileTrigger}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Menu do perfil"
          >
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarFallback}>
                {getInitials(student.name)}
              </div>
            )}
            <div className={styles.studentMeta}>
              <span className={styles.studentNameFull}>{student.name}</span>
              <span className={styles.studentRegistry}>RA: {student.registry}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className={styles.dropdownProfile}>
              <div className={styles.profileDropdownHeader}>
                <div className={styles.profileHeaderInitials}>
                  {getInitials(student.name)}
                </div>
                <div className={styles.profileHeaderDetails}>
                  <h4>{student.name}</h4>
                  <p>{student.course}</p>
                  <span>Registro: {student.registry}</span>
                </div>
              </div>
              <div className={styles.profileDropdownMenu}>
                <button
                  className={styles.profileMenuItem}
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/perfil");
                  }}
                >
                  <UserOutlined />
                  <span>Meu Perfil</span>
                </button>
                <button
                  className={styles.profileMenuItem}
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Add setting routing if any
                  }}
                >
                  <SettingOutlined />
                  <span>Configurações</span>
                </button>
                <button
                  className={styles.profileMenuItem}
                  onClick={() => {
                    setShowProfileMenu(false);
                  }}
                >
                  <QuestionCircleOutlined />
                  <span>Central de Ajuda</span>
                </button>
                <div className={styles.menuDivider} />
                <button
                  className={`${styles.profileMenuItem} ${styles.menuItemLogout}`}
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Handle Logout
                    message.info("Saindo do portal...");
                  }}
                >
                  <LogoutOutlined />
                  <span>Sair do Sistema</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
