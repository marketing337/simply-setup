import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar } from "lucide-react";
import { Alert } from "@shared/schema";

export function UpdatesAlertsSection() {
  const { data: alerts, isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts/active"],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Updates & Alerts Loading */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Updates & Alerts</h2>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse border border-gray-200">
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Due Dates Loading */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Due Dates</h2>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse border border-gray-200">
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!alerts || alerts.length === 0) {
    return null;
  }

  const notices = alerts.filter(alert => alert.cardType === 'notice');
  const dueDates = alerts.filter(alert => alert.cardType === 'due_date');

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace(/\s/g, '-');
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTagText = (alert: Alert) => {
    if (alert.cardType === 'notice') {
      // Extract tag from description or use type
      if (alert.description.includes('MCA Compliance')) return 'MCA Compliance';
      if (alert.description.includes('FLA Return')) return 'FLA Return';
      if (alert.description.includes('GSTR')) return 'GSTR 3B';
      return alert.type.charAt(0).toUpperCase() + alert.type.slice(1);
    }
    return '';
  };

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Updates & Alerts Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Updates & Alerts</h2>
            </div>
            
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card 
                  key={notice.id} 
                  className="border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer bg-white"
                  onClick={() => {
                    if (notice.targetUrl) {
                      if (notice.targetType === "external") {
                        window.open(notice.targetUrl, "_blank");
                      } else {
                        window.location.href = notice.targetUrl;
                      }
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-blue-600 leading-relaxed">
                        {notice.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Published on: {formatDate((notice as any).publishedDate || notice.createdAt)}
                        </span>
                        {getTagText(notice) && (
                          <span className={`text-xs px-2 py-1 rounded border ${getTagColor(notice.type)}`}>
                            {getTagText(notice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Due Dates Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Due Dates</h2>
            </div>
            
            <div className="space-y-4">
              {dueDates.map((dueDate) => (
                <Card 
                  key={dueDate.id} 
                  className="border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer bg-white"
                  onClick={() => {
                    if (dueDate.targetUrl) {
                      if (dueDate.targetType === "external") {
                        window.open(dueDate.targetUrl, "_blank");
                      } else {
                        window.location.href = dueDate.targetUrl;
                      }
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-gray-900 leading-relaxed">
                        {dueDate.title}
                      </h3>
                      
                      <div className="text-xs text-gray-600">
                        Due Date: {(dueDate as any).dueDate ? formatDate((dueDate as any).dueDate) : 'Not specified'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}