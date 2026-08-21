import { Reveal } from "@/components/Reveal";
import { Zap, BarChart3, Cpu, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CMS_KeySection() {
    const { text } = useLanguage();
    return (
        <section id="cms_key" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
            <div className="container">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="section-title">{text("주요 기능", "Key Features")}</h2>
                    </Reveal>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                    <Reveal>
                        <p className="section-subtitle">
                            <span className="text-accent font-bold">W-CMS</span>
                            {text("가 제공하는 강력한 기능들", " powerful features")}
                        </p>
                    </Reveal>
                </div>

                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-primary p-8 rounded-lg border border-border hover:border-secondary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center mb-4">
                            <BarChart3 className="w-6 h-6 text-white/70" />
                        </div>
                        <h3 className="text-lg font-semibold text-white/90 mb-3">{text("통합 대시보드", "Integrated Dashboard")}</h3>
                        <p className="text-gray-300 mb-4">
                            {text("생산 현장의 모든 정보를 한 화면에서 실시간으로 모니터링합니다. 다양한 차트, 게이지, 지표를 통해 생산 상황을 직관적으로 파악할 수 있습니다.", "Monitor all production-floor information in real time from one screen, using charts, gauges, and indicators for intuitive visibility.")}
                        </p>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><span className="text-green-400 font-bold">✓</span> {text("실시간 데이터 시각화", "Real-time data visualization")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("다중 화면 구성", "Multi-screen layouts")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("알림 및 경고 기능", "Notifications and alerts")}</li>
                        </ul>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                            <Cpu className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{text("설비 제어 연동", "Equipment Control Integration")}</h3>
                        <p className="text-muted-foreground mb-4">
                            {text("CNC, 서보 모터 등 다양한 산업 설비와 실시간으로 연동됩니다. 설비 상태를 모니터링하고 원격으로 제어할 수 있습니다.", "Connect in real time with CNC machines, servo motors, and other industrial equipment to monitor status and control it remotely.")}
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><span className="text-green-400 font-bold">✓</span> {text("CNC 기계 연동", "CNC machine integration")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("서보 모터 제어", "Servo motor control")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("원격 제어 기능", "Remote control")}</li>
                        </ul>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{text("데이터 자동 변환", "Automatic Data Transformation")}</h3>
                        <p className="text-muted-foreground mb-4">
                            {text("복잡한 설비 데이터를 자동으로 변환·가공하여 의미 있는 정보로 변환합니다. 별도의 데이터 처리 없이 즉시 활용 가능합니다.", "Automatically transform complex equipment data into meaningful information for immediate use without separate processing.")}
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><span className="text-green-400 font-bold">✓</span> {text("자동 데이터 변환", "Automatic data transformation")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("실시간 가공", "Real-time processing")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("형식 자동 변환", "Automatic format conversion")}</li>
                        </ul>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                            <TrendingUp className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">{text("성능 분석", "Performance Analysis")}</h3>
                        <p className="text-muted-foreground mb-4">
                            {text("설비의 성능 지표를 분석하고 추세를 파악합니다. 데이터 기반의 의사결정을 지원합니다.", "Analyze equipment performance indicators and trends to support data-driven decisions.")}
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><span className="text-green-400 font-bold">✓</span> {text("성능 지표 분석", "Performance indicator analysis")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("추세 분석", "Trend analysis")}</li>
                            <li><span className="text-green-400 font-bold">✓</span> {text("리포트 생성", "Report generation")}</li>
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
