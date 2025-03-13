import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import { Plugin } from "vite";

const mergeNginxConfigFile = (addedConfig: string) => `
server {
  listen       80;
  listen  [::]:80;
  server_name  localhost;
  root   /usr/share/nginx/html;
      
  location / {
      try_files $uri /index.html;
  }
  
  ${addedConfig}
}
`;

const getSeoDatas = (): {
  path: string;
  title: string;
  description: string;
}[] => {
  const FOUNDATION_LABEL = "Foundations";
  const foundationsDir = path.join(
    cwd(),
    "src",
    "pages",
    FOUNDATION_LABEL.toLocaleLowerCase()
  );
  const foundationFiles = fs.readdirSync(foundationsDir);

  const foundationSeoDatas = foundationFiles.map((filename) => ({
    title: `${FOUNDATION_LABEL} | ${filename}`,
    path: `/${FOUNDATION_LABEL.toLocaleLowerCase()}/${filename.toLocaleLowerCase()}`,
    description: `This page describe how to use ${filename} foundation`,
  }));

  const COMPONENT_LABEL = "Components";
  const componentsDir = path.join(
    cwd(),
    "src",
    "pages",
    COMPONENT_LABEL.toLocaleLowerCase()
  );
  const componentFiles = fs.readdirSync(componentsDir);
  const componentSeoDatas = componentFiles.map((filename) => ({
    title: `${COMPONENT_LABEL} | ${filename}`,
    path: `/${COMPONENT_LABEL.toLocaleLowerCase()}/${filename.toLocaleLowerCase()}`,
    description: `This page describe how to use ${filename} foundation`,
  }));

  return [...foundationSeoDatas, ...componentSeoDatas];
};

const seoPlugin = (): Plugin => {
  return {
    name: "rui-guide-seo-plugin",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");

      // 기본 index.html 읽기
      const indexHtmlPath = path.join(distDir, "index.html");
      let baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

      let addedLocatinConfigContent = ``;

      // 각 경로별 HTML 파일 생성
      const seoDatas = getSeoDatas();
      seoDatas.forEach(
        (route: { path: string; title: string; description: string }) => {
          const url = route.path;

          const locationBlockContent = `
            location ${url} {
              try_files $uri ${url}/index.html; 
            }
            
          `;
          if (url !== "/")
            addedLocatinConfigContent =
              addedLocatinConfigContent + locationBlockContent;

          // SEO 메타 태그 추가
          const seoMetaTags = `
          <title>${route.title || "Default Title"}</title>
          <meta name="description" content="${
            route.description || "Default description"
          }">
        `;

          const finalHtml = baseHtml.replace(`<!--seo-meta-->`, seoMetaTags);

          const outputPath = path.join(distDir, url, "index.html");
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, finalHtml);
        }
      );

      const nginxConfigFilePath = path.join(cwd(), "nginx.conf");
      fs.writeFileSync(
        nginxConfigFilePath,
        mergeNginxConfigFile(addedLocatinConfigContent)
      );
    },
  };
};
export default seoPlugin;
