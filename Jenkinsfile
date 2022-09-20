pipeline {
agent any
tools {jdk "oracle-java-8"}
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
          script {
            allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                    
            ])
    }
    }
}
}
}