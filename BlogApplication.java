import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class BlogApplication {
    private List<BlogPost> blogPosts;

    public BlogApplication() {
        this.blogPosts = new ArrayList<>();
    }

    public void addBlogPostFromMarkdown(String filePath) throws IOException {
        String content = new String(Files.readAllBytes(Paths.get(filePath)));
        String[] lines = content.split("\n");
        String title = lines[0].replace("# ", "").trim();
        StringBuilder body = new StringBuilder();
        for (int i = 1; i < lines.length; i++) {
            body.append(lines[i]).append("\n");
        }
        blogPosts.add(new BlogPost(title, body.toString()));
    }

    public List<BlogPost> getBlogPosts() {
        return blogPosts;
    }

    public static void main(String[] args) {
        BlogApplication app = new BlogApplication();
        try {
            app.addBlogPostFromMarkdown("path/to/your/blogpost.md");
            for (BlogPost post : app.getBlogPosts()) {
                System.out.println("Title: " + post.getTitle());
                System.out.println("Body: " + post.getBody());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class BlogPost {
    private String title;
    private String body;

    public BlogPost(String title, String body) {
        this.title = title;
        this.body = body;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }
}
