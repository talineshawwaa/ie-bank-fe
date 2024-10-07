<template>
    <div class="homepage-container">
      <div class="welcome-section">
        <h1>Welcome to IE Bank Corp</h1>
        <p>Your trusted partner for secure banking solutions.</p>
        <button class="accounts-button" @click="goToAccounts">
          Go to Accounts
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    methods: {
      goToAccounts() {
        this.$router.push('/accounts'); // Navigate to the accounts page
      }
    }
  }
  </script>
  
  <style scoped>
  .homepage-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f6f8;
  }
  
  .welcome-section {
    text-align: center;
    background-color: white;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #2c3e50;
    font-size: 36px;
  }
  
  p {
    font-size: 18px;
    margin: 20px 0;
    color: #7f8c8d;
  }
  
  .accounts-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .accounts-button:hover {
    background-color: #2980b9;
  }
  </style>
  