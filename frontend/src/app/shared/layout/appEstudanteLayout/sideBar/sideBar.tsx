import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSidebar } from "../../../context/sidebarContext";
import styles from "./sideBar.module.css";

interface SideBarProps {
  onItemClick?: () => void;
}

interface MenuItem {
  path?: string;
  label: string;
  icon?: React.ReactNode;
  isHeader?: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({
  onItemClick,
}) => {
  const { isCollapsed, toggleCollapse, closeMobile } = useSidebar();

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
    closeMobile();
  };
  const menuItems: MenuItem[] = [
    {
      path: "/paginaInicial",
      label: "Página Inicial",
      icon: <HomeOutlined className={styles.icon} />,
    },
  ];

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      {/* Sidebar Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <span className={styles.logoLetter}>U</span>
        </div>
        {!isCollapsed && (
          <div className={styles.logoText}>
            <span className={styles.brandName}>Portal UCC</span>
            <span className={styles.brandSub}>Estudante</span>
          </div>
        )}
      </div>

      {/* Sidebar Menu */}
      <nav className={styles.navMenu}>
        {menuItems.map((item, index) => {
          if (item.isHeader) {
            if (isCollapsed) return null;
            return (
              <div key={index} className={styles.sectionHeader}>
                {item.label}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
              onClick={handleItemClick}
            >
              <div className={styles.itemContent}>
                {item.icon}
                {!isCollapsed && (
                  <span className={styles.label}>{item.label}</span>
                )}
              </div>
              {!isCollapsed && <div className={styles.activeIndicator} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Action in Sidebar Footer */}
      <div className={styles.sidebarFooter}>
        <button className={styles.collapseButton} onClick={toggleCollapse}>
          {isCollapsed ? (
            <MenuUnfoldOutlined className={styles.collapseIcon} />
          ) : (
            <div className={styles.collapseFooterText}>
              <MenuFoldOutlined className={styles.collapseIcon} />
              <span>Recolher menu</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
