import React from 'react'
import styles from './DashBoard.module.css';
export default function DashBoard() {
  return <>
<div className="container-fluid p-4 bg-light">
      {/* Header */}
      <div className="d-flex justify-content-center align-items-center bg-dark text-white p-3 rounded mb-4">
        <h2>Dashboard</h2>
      </div>

      {/* Stats Panels */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className={`${styles.card} text-center shadow-sm`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>Total Users</h5>
              <p className="card-text display-4">22</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`${styles.card} text-center shadow-sm`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>Revenue</h5>
              <p className="card-text display-4">$2.9k</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`${styles.card} text-center shadow-sm`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>New Orders</h5>
              <p className="card-text display-4">25</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className={`${styles.card} text-center shadow-sm`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>Analysis</h5>
              <p className="card-text display-4">80%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graph and Details */}
      <div className="row mt-4">
        <div className="col-md-8">
          <div className={`${styles.card} text-center shadow-sm`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>Performance</h5>
              <div className={styles.chart}>
                {/* Placeholder for Graph */}
                <div className="bg-light" style={{ height: "200px" }}>
                  Graph Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className={styles.cardTitle}>Latest Updates</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Order #123 completed</li>
                <li className="list-group-item">New user joined</li>
                <li className="list-group-item">Server updated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

}
