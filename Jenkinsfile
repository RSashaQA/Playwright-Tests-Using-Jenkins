pipeline {
agent any
tools {maven "Maven"}
  stages {
    stage('Prepare playwright') {
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
          npx playwright test example.spec.js --workers 1 --project=chromium
        '''
      }
    }
    stage('reports') {
      steps{
            allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: '/target/allure-results']]
                    
            ])
    }
    }
}
}