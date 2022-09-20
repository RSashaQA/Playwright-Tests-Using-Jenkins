pipeline {
  agent any
  stages {
    stage('prepare playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npm i -D experimental-allure-playwright
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

