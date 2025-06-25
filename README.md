### **Steps to Run the Deployed Docker Image Locally from Docker Hub**

1.  Open your terminal in VS Code and run: docker login
    
    *   Enter your Docker Hub **username**.
        
    *   Then paste the **access token** you generated earlier.
        
2.  Use the image tag defined in your GitHub Actions workflow (e.g. ecdigital/jest-testing:latest) and run it **interactively**: docker run -it ecdigital/jest-testing:latest
    
    *   \-it is essential because your project is interactive (e.g., using readline-sync).
        
    *   Docker will:
        
        *   Look for the image locally.
            
        *   If not found, it will **pull it from Docker Hub**.
            
        *   Then, it will **start the container and run the default CMD**, which is likely npm start (as defined in your Dockerfile).
            
3.  💡 **What You Should See**
    
    *   The Node.js app should launch just like when you run npm start locally.
        
    *   If your project starts with a terminal menu, it will appear inside your terminal.
        
    *   You can interact with it like normal.
        

### ✅ Example Command Recap:

` docker login  `

` docker run -it ecdigital/jest-testing:latest   `