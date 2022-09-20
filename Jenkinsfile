pipeline {
  agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
          npm i -D experimental-allure-playwright
          npm i -D allure-commandline
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test categories.spec.js --workers 4 --project=chromium --reporter=line,experimental-allure-playwright
        '''
      }
    }
    stage('report') {
      steps {
       sh '''
       npx allure generate ./allure-results --clean
       '''
      }
    }
    stage('open report') {
      steps {
       sh '''
       npx allure open ./allure-report
       '''
      }
    }    
  }
}

