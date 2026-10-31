<script setup lang="ts">
</script>

<template>
  <footer id="credits" data-chapter="credits" class="section credits">
    <div class="section-inner narrow">
      <p class="eyebrow">证据来源 · 致谢</p>
      <h2>证据与版权</h2>
      <p>
        本报告证据来源如下（作品静帧／公版图／展览材料）。媒体优先滚动论文。Tier1 公版／CC 历史图内嵌自
        <code>public/media/{a–f}/</code>；教育用途嵌入公版图与博物馆／展览／新闻公开静帧；禁止 AI 伪造艺术品。完整来源表见仓库
        <code>CREDITS.md</code> 与各包 <code>MEDIA.md</code>。
      </p>
      <ul>
        <li>A｜Saleh／Pieneman 画作 — Wikimedia Commons，公版</li>
        <li>B｜太平洋战争／日帝地图 — Wikimedia Commons，PD／CC BY-SA</li>
        <li>C｜占婆历史地图 — Wikimedia Commons，CC0／PD／CC BY-SA</li>
        <li>D｜民主纪念碑照片 — Wikimedia Commons，CC BY-SA 4.0；死亡铁路图仅纠错页</li>
        <li>E｜Dalrymple 海图与苏禄／摩洛示意 — Wikimedia Commons，PD／CC BY-SA</li>
        <li>F｜莱佛士雕像与肖像 — Wikimedia Commons，CC BY-SA／公版</li>
        <li>Ambient：Howler 软噪声床；中文 VO = edge-tts（滚动入章触发）＋字幕同步；视频 = OA 档案剪辑 ＋ generated-atmosphere Ken Burns</li>
        <li>技术：Vite + Vue3 + GSAP ScrollTrigger + Lenis + Howler（原创实现；非 NanoGL／非 RE insidekristallnacht）</li>
      </ul>
      <p class="end">完 · 欢迎提出勘误</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.credits {
  border-top: 1px solid var(--line);
  padding-bottom: 6rem;
  h2 {
    margin-bottom: 1rem;
  }
  p,
  li {
    color: var(--ink-muted);
    font-size: 0.9rem;
  }
  code {
    font-size: 0.8em;
    color: var(--accent-soft);
  }
  ul {
    margin: 1.25rem 0 2rem;
    padding-left: 1.1rem;
  }
  li {
    margin-bottom: 0.45rem;
  }
  .end {
    font-family: var(--serif);
    color: var(--accent-soft);
    letter-spacing: 0.12em;
  }
}
</style>
