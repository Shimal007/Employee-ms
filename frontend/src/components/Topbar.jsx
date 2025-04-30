export default function Topbar({ onSearch, searchTerm }) {
    return (
      <div className="topbar">
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
        
        <div className="user-profile">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">HR Manager</span>
          </div>
        </div>
      </div>
    );
  }