pipeline {
agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npm install fs-extra
          npx playwright install
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test --workers 8 --project=chromium
        '''
      }
    }
      stage('Reports') {
        steps {
          allure
          includeProperties: true,
          jdk: '',
          results: [[path: 'allure-results']]
  	  }
    }
  }
}