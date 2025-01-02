// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript for page transition
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
});

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.href.startsWith(window.location.origin)) {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        }
    });
});

// JavaScript for displaying blog posts
if (document.querySelector('.blog-posts')) {
    const blogFiles = ['posts/blogpost.md', 'posts/blogpost2.md']; // Add more blog post files here

    const blogContainer = document.querySelector('.blog-posts');

    blogFiles.forEach((file, index) => {
        console.log(`Fetching file: ${file}`); // Debug log
        fetch(file)
            .then(response => {
                console.log(`Received response for ${file}:`, response); // Debug log
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(content => {
                console.log(`Loaded content from ${file}:`, content); // Debug log
                const lines = content.split('\n');
                const title = lines[0].replace('# ', '').trim();
                const body = lines.slice(1).join('\n');
                const date = new Date().toLocaleDateString(); // Use current date for simplicity

                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');

                const headerElement = document.createElement('div');
                headerElement.classList.add('blog-header');

                const numberElement = document.createElement('span');
                numberElement.classList.add('blog-number');
                numberElement.textContent = `#${index + 1}`;

                const titleElement = document.createElement('span');
                titleElement.classList.add('blog-title');
                titleElement.textContent = title;

                const dateElement = document.createElement('span');
                dateElement.classList.add('blog-date');
                dateElement.textContent = date;

                headerElement.appendChild(numberElement);
                headerElement.appendChild(titleElement);
                headerElement.appendChild(dateElement);
                postElement.appendChild(headerElement);

                const bodyElement = document.createElement('div');
                bodyElement.innerHTML = marked(body); // Use marked to parse Markdown
                bodyElement.classList.add('blog-body');
                postElement.appendChild(bodyElement);

                headerElement.addEventListener('click', () => {
                    const isVisible = bodyElement.style.display === 'block';
                    bodyElement.style.display = isVisible ? 'none' : 'block';
                });

                blogContainer.appendChild(postElement);
                console.log(`Appended post: ${title}`); // Debug log
            })
            .catch(error => console.error('Error loading blog post:', error));
    });
}
