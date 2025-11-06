import { Card } from '@/app/components/ui/Card'

export function CustomerListSkeleton() {
  return (
    <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/80 backdrop-blur-xl sticky top-0 z-10">
            <tr className="border-b">
              <th className="text-left p-4">会社名</th>
              <th className="text-left p-4">ステータス</th>
              <th className="text-left p-4">支援内容</th>
              <th className="text-right p-4">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40" />
                </td>
                <td className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-md" />
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
