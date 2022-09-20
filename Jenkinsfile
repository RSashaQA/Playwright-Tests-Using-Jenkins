pipeline {
  agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test categories.spec.js --workers 1 --project=chromium
        '''
      }
    }
  }
}

