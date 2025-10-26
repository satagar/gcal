
import os
import json

# Create project structure
project_structure = {
    "calendar-app": {
        "frontend": {
            "src": {
                "components": [
                    "CalendarGrid.jsx",
                    "EventModal.jsx", 
                    "EventChip.jsx",
                    "Header.jsx"
                ],
                "stores": [
                    "useCalendarStore.js",
                    "useEventsStore.js"
                ],
                "utils": [
                    "dateHelpers.js"
                ],
                "files": [
                    "App.jsx",
                    "main.jsx",
                    "index.css"
                ]
            },
            "root_files": [
                "package.json",
                "vite.config.js",
                "tailwind.config.js",
                "postcss.config.js",
                "index.html",
                ".gitignore"
            ]
        },
        "backend": {
            "src": {
                "routes": [
                    "events.js"
                ],
                "files": [
                    "server.js"
                ]
            },
            "prisma": [
                "schema.prisma"
            ],
            "root_files": [
                "package.json",
                ".env",
                ".gitignore"
            ]
        },
        "root_files": [
            "README.md"
        ]
    }
}

print("Project structure created successfully!")
print(json.dumps(project_structure, indent=2))
